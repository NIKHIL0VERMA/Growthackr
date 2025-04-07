import { createSignal, JSX } from "solid-js";
import '@assets/styles/GetStartedButton.css';

const GetStartedButton = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <div class="styled-wrapper">
      <button
        class={`cssbuttons-io-button ${isHovered() ? "hover" : ""}`}
        onClick={props.onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Get started
        <div class="GSBicon">
          <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default GetStartedButton;