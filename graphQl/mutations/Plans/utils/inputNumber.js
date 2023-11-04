import $ from "jquery";
import gsap from "gsap";
// inject a function that select text
const selectText = function () {
    this.find("input").each(function () {
        if ($(this).prev().length == 0 || !$(this).prev().hasClass("p_copy")) {
            $(
                '<p class="p_copy" style="position: absolute; z-index: -1;"></p>'
            ).insertBefore($(this));
        }
        $(this).prev().html($(this).val());
    });
    let doc = document;
    let element = this[0];
    if (doc.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        let selection = window.getSelection();
        let range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};
// make operation on number and form it
const numOp = (num, op, digits = 2, format) => {
    num += op;
    if (format)
        for (let t = 1; t <= digits; t++) {
            if (num < 10 ** t) return "0".repeat(digits - t) + num;
        }
    return num;
};
// forbidden Change action
const forbiddenChange = (content, sign = 1) => {
    gsap.to(content, {
        x: 8 * sign,
        scale: 0.95,
        duration: 0.05,
        onComplete() {
            const tl = gsap.timeline();
            tl.to(content, { x: -6 * sign })
                .to(content, { x: 3 * sign })
                .to(content, { x: -1 * sign })
                .to(content, { x: 0, scale: 1 })
                .duration(0.35);
        },
    });
};
// counter function
export const counter = (content) => {
    const inputNumber = content.parents(".inputNumber"),
        transition_duration =
            parseFloat(content.css("transition-duration")) * 1000,
        dragLimit = 27,
        format = content.attr("data-format");
    let down,
        focus,
        x,
        startUp,
        instChangeInterval,
        freqChangeInterval,
        firstTap,
        current = +content.attr("data-current"),
        freeze = eval(content.attr("data-freeze")),
        max = +content.attr("data-max") || 10000,
        min = +content.attr("data-min") || 0,
        digitWidth = +content.attr("data-digitWidth") || max.toString().length,
        digits = digitWidth,
        preventChange = false;
    // set dimension
    gsap.set(content, {
        width: `${0.75 * digits}em`,
        padding: `${0.25 * digits}em ${0.1 * digits}em`,
    });
    // drag action
    const dragUpdate = (xValue) => {
        console.log(xValue, preventChange);
        // check if it is an animation during now
        if (preventChange) return;
        // add instentenius flag to animate
        preventChange = true;
        if (xValue >= dragLimit && current < max) {
            content.addClass("increase");
        } else if (xValue <= -dragLimit && current > min) {
            content.addClass("decrease");
        } else {
            preventChange = false;
            return forbiddenChange(content, xValue >= dragLimit ? -1 : 1);
        }
        // reset every thing like it was before
        setTimeout(() => {
            preventChange = false;
            // update current data
            current = numOp(current, Math.sign(xValue), digits, format);
            content.attr("data-current", current);
            current = +current;
            // remove the animation classes
            content.removeClass("increase decrease");
        }, transition_duration);
    };
    // current attr observer
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "data-current") {
                // update current text
                current = +mutation.target.dataset.current;
                content.children().text(numOp(current, 0, digits, format));
                // update data before and after attrs
                mutation.target.dataset.before = numOp(
                    current,
                    -1,
                    digits,
                    format
                );
                mutation.target.dataset.after = numOp(
                    current,
                    1,
                    digits,
                    format
                );
                // style the arrows to max
                if (current == max) inputNumber.addClass("max");
                // else if (current == min) inputNumber.addClass("min");
                else inputNumber.removeClass("max");
                // style the arrows to min
                if (current == min) inputNumber.addClass("min");
                else inputNumber.removeClass("min");
            } else if (mutation.attributeName === "data-freeze")
                freeze = mutation.target.dataset.freeze;
            else if (mutation.attributeName === "data-max")
                max = mutation.target.dataset.max || max;
        });
    });
    observer.observe(content[0], {
        attributes: true,
        attributeFilter: ["data-current", "data-freeze", "data-max"],
    });
    // initial content setup
    content[0].dataset.current = current;
    // double tap custom event
    const doubleTapEvent = new CustomEvent("doubleTap");
    // counter content events
    content.on({
        dblclick() {
            !freeze && $(this).trigger("focus");
            selectText.apply($(this));
        },
        doubleTap() {
            !freeze && $(this).trigger("dblclick");
        },
        "mousedown touchstart": (e) => {
            if (freeze) return;
            // check if touch or mouse
            e = e.touches?.[0] || e;
            // set flags
            down = true;
            x = e.clientX;
        },
        touchend(e) {
            if (freeze) return;
            if (firstTap) {
                firstTap = false;
                // double tap
                this.dispatchEvent(doubleTapEvent);
            } else {
                firstTap = true;
                setTimeout(() => (firstTap = false), 500);
            }
        },
        focus() {
            if (!freeze) focus = true;
            // $(this)
            //     .children()
            //     .text(+current);
        },
        keydown(e) {
            if (freeze) return;
            // filter typing content
            if (
                /(Backspace)|(Delete)/.test(e.key) &&
                $(this).children().text().length == 1
            ) {
                // just one character left
                e.preventDefault();
                return $(this).children().text("0");
            }
            // navigation and deletion
            if (/(Backspace)|(Delete)|(^Arrow)/.test(e.key)) return;
            // blur when press enter
            if (/Enter/.test(e.key)) return $(this).trigger("blur");
            // prevent typing
            if (
                !/[0-9]/.test(e.key) ||
                (!window.getSelection().toString() &&
                    $(this).children().text().length > digits - 1)
            )
                e.preventDefault();
        },
        blur: () => {
            if (freeze) return;
            focus = false;
            // range bounding
            const contentText = +$(content).text(),
                isForbidden = contentText > max || contentText < min;
            current = isForbidden ? current : contentText;
            isForbidden && forbiddenChange(content);
            content[0].dataset.current = current;
        },
    });
    // window events
    $(window).on({
        "mousemove touchmove": (e) => {
            if (freeze) return;
            if (down && !focus) {
                // check if touch or mouse
                e = e.touches?.[0] || e;
                // clear last intervals
                clearInterval(freqChangeInterval);
                clearInterval(instChangeInterval);
                var xValue = gsap.utils.clamp(-30, 30, e.clientX - x);
                // increase or decrease condition
                if (xValue >= 27 || xValue <= -27) {
                    if (!startUp) {
                        dragUpdate(xValue);
                        startUp = true;
                    }
                    freqChangeInterval = setInterval(() => {
                        dragUpdate(xValue);
                    }, transition_duration + 100);
                } else startUp = false;
                // move
                gsap.set(content, { x: xValue });
            }
        },
        "mouseup touchend touchcancel": () => {
            if (freeze) return;
            clearInterval(freqChangeInterval);
            clearInterval(instChangeInterval);
            startUp = false;
            down = false;
            gsap.to(content, {
                x: 0,
                ease: "back.out(4)",
            });
        },
    });
    // click on the after arrows events
    content
        .parents(".inputNumber")
        .children(".v-icon.increase")
        .on("click", () => {
            console.log("clicked after");
            console.log(typeof freeze);
            !freeze && dragUpdate(dragLimit);
        });
    // click on the before arrows events
    content
        .parents(".inputNumber")
        .children(".v-icon.decrease")
        .on("click", () => !freeze && dragUpdate(-dragLimit));
};
