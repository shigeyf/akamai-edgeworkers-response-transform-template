/**
 * akamai-edgeworkers-localsim/EW/interfaces/HeadersUI
// This is what we receives from programmers' applications at the API.
// For convenience reasons, the programmers can give a single header value string
// instead of header value string array.
export interface HeadersUI {
    [others: string]: string | string[];
}
