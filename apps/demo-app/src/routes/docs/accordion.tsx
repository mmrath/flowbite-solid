import { Accordion } from "flowbite-solid";
import { createSignal } from "solid-js";
import { HiOutlineArrowCircleDown } from "solid-icons/hi";
import { Theme as Flowbite } from "flowbite-solid";

export default function AccordionDemo() {
  const [collapseAll, setCollapseAll] = createSignal(false);
  const [flush, setFlush] = createSignal(false);
  const [alwaysOpen, setAlwaysOpen] = createSignal(false);
  const theme = {
    accordion: {
      title: {
        arrow: {
          base: "w-8 h-8",
          open: {
            off: "",
            on: "text-purple-600",
          },
        },
        base: "p-3",
        flush: {
          off: "text-4xl",
          on: "text-3xl",
        },
        open: {
          off: "text-gray-400",
          on: "text-gray-600",
        },
      },
    },
  };
  return (
    <div class={"gap-4 p-5"}>
      <div>
        <input
          id={"collapseAllChk"}
          type="checkbox"
          checked={collapseAll()}
          onChange={e => setCollapseAll(e.currentTarget.checked)}
        />
        <label for={"collapseAllChk"}>Collapse All</label>
      </div>
      <div>
        <input
          id={"flushChk"}
          type="checkbox"
          checked={flush()}
          onChange={e => setFlush(e.currentTarget.checked)}
        />
        <label for={"flushChk"}>Flush</label>
      </div>
      <div>
        <input
          id={"alwaysOpenChk"}
          type="checkbox"
          checked={alwaysOpen()}
          onChange={e => setAlwaysOpen(e.currentTarget.checked)}
        />
        <label for={"alwaysOpenChk"}>Always open</label>
      </div>
      <Accordion
        flush={flush()}
        collapseAll={collapseAll()}
        alwaysOpen={alwaysOpen()}
        class={"mt-5"}
      >
        <Accordion.Panel eventKey={"0"}>
          <Accordion.Title>What is Flowbite?</Accordion.Title>
          <Accordion.Content>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is an open-source library of interactive components built on top of Tailwind
              CSS including buttons, dropdowns, modals, navbars, and more.
            </p>
            <p class="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to{" "}
              <a
                href="https://flowbite.com/docs/getting-started/introduction/"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                get started
              </a>{" "}
              and start developing websites even faster with components on top of Tailwind CSS.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel eventKey={"1"}>
          <Accordion.Title>Is there a Figma file available?</Accordion.Title>
          <Accordion.Content>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma software so everything
              you see in the library has a design equivalent in our Figma file.
            </p>
            <p class="text-gray-500 dark:text-gray-400">
              Check out the{" "}
              <a
                href="https://flowbite.com/figma/"
                class="text-blue-600 hover:underline dark:text-blue-500"
              >
                Figma design system
              </a>{" "}
              based on the utility classes from Tailwind CSS and components from Flowbite.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel eventKey={"3"}>
          <Accordion.Title>
            What are the differences between Flowbite and Tailwind UI?
          </Accordion.Title>
          <Accordion.Content>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are open source under
              the MIT license, whereas Tailwind UI is a paid product. Another difference is that
              Flowbite relies on smaller and standalone components, whereas Tailwind UI offers
              sections of pages.
            </p>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI
              as there is no technical reason stopping you from using the best of two worlds.
            </p>
            <p class="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul class="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      <Flowbite theme={{ theme }}>
        <Accordion arrowIcon={HiOutlineArrowCircleDown}>
          <Accordion.Panel eventKey={"0"}>
            <Accordion.Title as="h3" class="text-blue-300" id="accordion-title">
              Title
            </Accordion.Title>
            <Accordion.Content aria-labelledby="accordion-title" class="text-blue-300">
              <p>Content</p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel eventKey={"1"}>
            <Accordion.Title>Title</Accordion.Title>
            <Accordion.Content>
              <p>Content</p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </Flowbite>
    </div>
  );
}
