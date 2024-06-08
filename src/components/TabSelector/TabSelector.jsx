import styles from "./TabSelector.module.css";

export default function TabSelector({ active, setActive, options }) {
  return (
    <>
      {/* TODO: MOBILE SELECT */}
      {/* <div className="sm:hidden">
        // <label htmlFor="Tab" className="sr-only">
        //   Tab
        // </label>
        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          <option select>Notifications</option>
        </select>
      </div> */}
      <div className="hidden sm:block">
        <nav className="flex gap-6" aria-label="Tabs">
          {options.map((option) => (
            <a
              key={option}
              onClick={() => setActive(option)}
              href="#"
              className={`${styles.root} ${
                active === option ? styles.active : ""
              } shrink-0 rounded-lg p-2 text-md font-medium `}
            >
              {option}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
