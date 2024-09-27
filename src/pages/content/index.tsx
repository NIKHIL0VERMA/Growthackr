import { render } from "solid-js/web";

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

// Wrap the JSX in a function to resolve the type error
render(() => <div>content</div>, root);
