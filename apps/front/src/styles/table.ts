import tw, { css } from 'twin.macro';

export const tableDefaultStyle = [
  css`
    .rs-table-cell-content {
      ${tw`flex items-center`}
    }
    .rs-table-row {
      ${tw`rounded-lg`}
    }

    .rs-table-cell-header .rs-table-cell:not(.rs-table-cell-last) .rs-table-cell-content {
      ${tw`justify-between`}
      &::after {
        ${tw`w-0.5 h-[70%] bg-gray-200 bg-opacity-10`}
        content: ' ';
      }
    }

    .rs-table-scrollbar-vertical .rs-table-scrollbar-pressed,
    .rs-table-scrollbar-vertical:hover {
      ${tw`shadow-none`}
    }

    .rs-table-scrollbar-handle {
      ${tw`bg-gray-200 bg-opacity-30`}
    }
  `,
];

export const tableBgStyle = [
  css`
    .rs-table-row-header {
      ${tw`bg-transparent`}
    }
    .rs-table-cell {
      ${tw`bg-transparent border-none`}
    }
    .rs-table-body-row-wrapper {
      .rs-table-row {
        .rs-table-cell {
          ${tw`transition-colors`}
        }
      }

      .rs-table-row:hover {
        .rs-table-cell {
          ${tw`bg-gray-200 bg-opacity-20`}
        }
        ${tw`bg-transparent`}
      }

      .rs-table-row:nth-child(odd) {
        ${tw`bg-gray-100 bg-opacity-5`}
      }
    }
  `,
];

export const headerCellDivider = [css``];
