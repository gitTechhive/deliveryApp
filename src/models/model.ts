/**
 * Permission values for write and read operations.
 */
export const PermissionValues = {
  write: "WRITE",
  read: "READ",
};

/**
 * Modes of operations, such as QA and LIVE.
 */
export const MODE_OF_OPERATIONS = {
  QA: "QA",
  LIVE: "LIVE",
};

/**
 * Interface for ResponseWrapperDTO representing API response wrapper.
 */
export interface ResponseWrapperDTO {
  status: string;
  message: string;
  data: any;
  path?: string;
  error: boolean;
}

/**
 * Common props shared by multiple components.
 */
export interface CommonProps {
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  searchTxt: string | undefined;
  value: string | number | readonly string[] | undefined;
}

/**
 * Modal context props.
 */
export interface ModalContextProps {
  modal: boolean;
  handleModal: (content?: any, value?: any, dismissModal?: boolean) => void;
  modalContent: any;
  modalValue: any;
}

/**
 * Interface for route list items.
 */
export interface RoutesList {
  path: string;
  icon: JSX.Element;
  name: string;
  exact: boolean;
}

/**
 * Props for pagination component.
 */
export interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: 1 | undefined;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageSizeChange: any;
  otherHtml?: any;
}

/**
 * Props for button component.
 */
export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: any;
  disabled?: any;
  icon?: JSX.Element;
  children?: any;
}

/**
 * Props for text field component.
 */
export interface TextFieldProps {
  name: any;
  title?: any;
  label: string;
  type: string;
  placeholder: string;
  maxLength: any;
  width: any;
  value?: any;
  disabled?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error: ((errorMessage: string) => React.ReactNode) | undefined;
}

/**
 * Props for router component.
 */
export interface RouterProps {
  component: any;
  path: string;
  caseSensitive?: boolean;
}

/**
 * Interface for dropdown list item format.
 */
export interface DropdownListFormat {
  label: string;
  value: any;
  sub?: Array<DropdownListFormat>;
  other?: any;
}



