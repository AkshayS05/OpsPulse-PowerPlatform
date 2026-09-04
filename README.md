# OpsPulse — Power Platform extensions

Custom extensions for a lost-package intelligence platform
built on Dataverse, Azure Functions and Azure OpenAI.

## Plug-ins
`LogAccountRename` — post-operation on Update, filtered to the
name column, uses a pre-image rather than a Retrieve call to
read the previous value.

`GetOpenAccountCount` — a Custom API implementing logic at the
main operation stage. Registered with
`Allowed Custom Processing Step Type = None` so the message
cannot be extended by other developers.

## Web resources
Client API scripts for conditional field behaviour on the
account and contact forms. Uses `formContext`, not the
deprecated `Xrm.Page`, and no direct DOM manipulation.

## PCF
`Counter` — a bound field component in TypeScript,
demonstrating the init / updateView / getOutputs / destroy
lifecycle and writing back via `notifyOutputChanged`.

## ALM
Built in an unmanaged solution, deployed as managed.
