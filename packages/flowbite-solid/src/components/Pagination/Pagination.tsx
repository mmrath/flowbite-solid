import classNames from "clsx";
import {
  HiSolidChevronLeft as HiChevronLeft,
  HiSolidChevronRight as HiChevronRight,
} from "solid-icons/hi";
import range from "../../helpers/range";
import { useTheme } from "../Flowbite";
import PaginationButton, { PaginationButtonProps } from "./PaginationButton";
import {
  ComponentProps,
  createMemo,
  For,
  JSX,
  mergeProps,
  ParentProps,
  Show,
  splitProps,
} from "solid-js";
import { Dynamic } from "solid-js/web";

export interface PaginationTheme {
  base: string;
  layout: {
    table: {
      base: string;
      span: string;
    };
  };
  pages: {
    base: string;
    showIcon: string;
    previous: {
      base: string;
      icon: string;
    };
    next: {
      base: string;
      icon: string;
    };
    selector: {
      base: string;
      active: string;
    };
  };
}

export type PaginationProps = ParentProps<Pagination>;

interface Pagination extends ComponentProps<"nav"> {
  currentPage: number;
  layout?: "navigation" | "pagination" | "table";
  onPageChange: (page: number) => void;
  showIcons?: boolean;
  totalPages: number;
  previousLabel?: string;
  nextLabel?: string;
  renderPaginationButton?: (props: PaginationButtonProps) => JSX.Element;
}

export const Pagination = (p: PaginationProps): JSX.Element => {
  const defaultProps = {
    layout: "pagination",
    showIcons: false,
    previousLabel: "Previous",
    nextLabel: "Next",
    renderPaginationButton: PaginationButton,
  };
  const [local, props] = splitProps(mergeProps(defaultProps, p), [
    "class",
    "currentPage",
    "layout",
    "onPageChange",
    "showIcons",
    "totalPages",
    "previousLabel",
    "nextLabel",
    "renderPaginationButton",
  ]);
  const theme = createMemo(() => useTheme().theme.pagination);

  const firstPage = createMemo(() => Math.max(1, local.currentPage - 3));
  const lastPage = createMemo(() => Math.min(local.currentPage + 3, local.totalPages));

  const goToNextPage = (): void => {
    local.onPageChange(Math.min(local.currentPage + 1, local.totalPages));
  };

  const goToPreviousPage = (): void => {
    local.onPageChange(Math.max(local.currentPage - 1, 1));
  };

  return (
    <nav class={classNames(theme().base, local.class)} {...props}>
      {local.layout === "table" && (
        <div class={theme().layout.table.base}>
          Showing <span class={theme().layout.table.span}>{firstPage()}</span> to&nbsp;
          <span class={theme().layout.table.span}>{lastPage()}</span> of&nbsp;
          <span class={theme().layout.table.span}>{local.totalPages}</span> Entries
        </div>
      )}
      <ul class={theme().pages.base}>
        <li>
          <Dynamic
            component={local.renderPaginationButton}
            class={classNames(
              theme().pages.previous.base,
              local.showIcons && theme().pages.showIcon
            )}
            onClick={goToPreviousPage}
          >
            <>
              {local.showIcons && <HiChevronLeft aria-hidden class={theme().pages.previous.icon} />}
              {local.previousLabel}
            </>
          </Dynamic>
        </li>
        <Show when={local.layout === "pagination"}>
          <For each={range(firstPage(), lastPage())}>
            {page => (
              <li aria-current={page === local.currentPage ? "page" : undefined}>
                <Dynamic
                  component={local.renderPaginationButton}
                  class={classNames(theme().pages.selector.base, {
                    [theme().pages.selector.active]: local.currentPage === page,
                  })}
                  active={page === local.currentPage}
                  onClick={() => local.onPageChange(page)}
                >
                  {page}
                </Dynamic>
              </li>
            )}
          </For>
        </Show>
        <li>
          <Dynamic
            component={local.renderPaginationButton}
            class={classNames(theme().pages.next.base, local.showIcons && theme().pages.showIcon)}
            onClick={goToNextPage}
          >
            <>
              {local.nextLabel}
              {local.showIcons && <HiChevronRight aria-hidden class={theme().pages.next.icon} />}
            </>
          </Dynamic>
        </li>
      </ul>
    </nav>
  );
};

Pagination.Button = PaginationButton;
