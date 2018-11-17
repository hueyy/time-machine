// runs in active tab
var cursorStyle = document.createElement("link");
cursorStyle.setAttribute("rel", "stylesheet");
cursorStyle.setAttribute("type", "text/css");
var cursors = ["hollow", "pyramid", "sword", "triforce"];
var cursorURL = "cursor-" + cursors[Math.round(Math.random() * cursors.length) % cursors.length] + ".css";
cursorStyle.setAttribute("href", chrome.runtime.getURL(cursorURL));
document.head.appendChild(cursorStyle);