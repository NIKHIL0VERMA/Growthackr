import logo from '../../../public/icons/48x48.png';
const App = () => {
  return (
    <div class="fixed right-5 top-20 z-[2000] w-80 rounded-xl bg-white">
      <div>
        <header>
          <img
            src={chrome.runtime.getURL(logo)}
            alt="logo"
          />
          <p class="flex flex-wrap font-bold">
            Edit <code>src/pages/content/index.tsx</code> and save to reload.
          </p>
          <a
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
        </header>
      </div>
    </div>
  );
};

export default App;