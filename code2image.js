
var CODE_LANG = 'auto';

function update_code() {
  const result_elem = document.querySelector("#highlighting-code code");
  let text = document.querySelector("#editing-code").value;
  let html;
  if (text[text.length-1] == "\n") {
    text += "  ";
  } else if (text == "") {
    text += "\n  ";
  } else if (text.indexOf("\n", 1) < 0) {
    text += "\n  ";
  }
  if (CODE_LANG == 'auto') {
    html = hljs.highlightAuto(text).value;
  } else {
    html = hljs.highlight(text, {language: CODE_LANG}).value
  }
  html = html.replace(new RegExp("  ", "g"), "&nbsp; ");
  result_elem.innerHTML = html;
  hljs.lineNumbersBlock(result_elem);
}

function select_change() {
  const lang = document.getElementById("langs-select");
  const style = document.getElementById("style-select");
  const link = document.getElementById("code-style");
  CODE_LANG = lang.options[lang.selectedIndex].value;
  style_css = style.options[style.selectedIndex].value;
  link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.1.0/styles/${style_css}.min.css`
}

function sync_scroll(element) {
  let result_element = document.querySelector("#highlighting-code");
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    event.preventDefault();
    let before_tab = code.slice(0, element.selectionStart);
    let after_tab = code.slice(element.selectionEnd, element.value.length); // 
    let cursor_pos = element.selectionEnd + 2;
    element.value = before_tab + "  " + after_tab;
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update_code(element.value);
  }
}

function resize() {
    const editor = document.querySelector('#editing-code');
    const precode = document.querySelector('#highlighting-code');
    precode.style.width = "calc(" + window.getComputedStyle(editor).width + " + 35px)";
    editor.style.height = "20px";
    if (editor.scrollHeight > 30) {
        editor.style.height = (editor.scrollHeight + 5)+"px";
    } else {
        editor.style.height = "60px";
    }
}

function show_capture() {
  const image = document.createElement('img');
  const container = document.querySelector('#result-image');
  html2canvas(document.querySelector("#highlighting-code")).then(canvas => {
    image.src=canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    image.classList.add('image-result');
    container.append(image);
  });
  container.style.display = "block";
}

function close_capture() {
  const container = document.querySelector('#result-image');
  const image = document.querySelector('#result-image img');
  container.style.display = "none";
  image.remove()

}

hljs.initLineNumbersOnLoad();

document.addEventListener("DOMContentLoaded", () => {
  update_code(); resize();
});