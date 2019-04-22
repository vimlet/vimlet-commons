# jsScratch.js
## Public Properties
|Property|Type|Description|
|---|---|---|
|public1|-|-|
|public2|-|-|


## Private Properties
|Property|Type|Description|
|---|---|---|
|private1|-|-|
|private2|-|-|

## Public Functions

#### public1

> Activate drag functionality

>|Parameter|Type|description|
>|---|---|---|
>|pp1|int|-|>|pp2|int|-|

#### public2

> Activate drag functionality




## Private Functions

#### _adaptDialogSize

> Adapt dialog size when windnow becomes smaller



#### _addBlurEvent

> Add listener that give blur functionality to dialog



#### _addDialogContent

> Add dialog content

>|Parameter|Type|description|
>|---|---|---|
>|content|object|cotent node|



#### _addDialogFooter

> Add dialog footer and its differents options

>|Parameter|Type|description|
>|---|---|---|
>|footerSection|object|footer node|



#### _addDialogHeading

> Add dialog heading and its differents options

>|Parameter|Type|description|
>|---|---|---|
>|newHeading|string|-|



#### _addDragListeners

> Establish limits for dialog movement

>|Parameter|Type|description|
>|---|---|---|
>|selected|object|dragged dialog node|>|windowWidth|int|-|>|windowHeight|int|-|



#### _addDragListeners

> Activate drag functionality



#### _dialogMaximize

> Set maximize functionality to dialog



#### _dialogMinimize

> Set minimize functionality to dialog



#### _dialogModal

> Set or remove modal overlay for modal option



#### _dialogModal

> Set dialog rezise functionality



#### _dialogPositioner

> Positions dialog correctly



#### _doMaximize

> Maximize dialog

>|Parameter|Type|description|
>|---|---|---|
>|resizer|object|store dialog resize nodes|>|maximize|object|node that apply maximized|>|minBar|object|minimize bar node|



#### _doMinimize

> Minimize dialog

>|Parameter|Type|description|
>|---|---|---|
>|minBar|object|minimize bar node|>|minimize|object|node that apply minimized|>|resizer|object|store dialog resize nodes|



#### _followingDialogsZindex

> Update z-index of differents dialogs when there are open more than one

>|Parameter|Type|description|
>|---|---|---|
>|openDialogs|object|Store node and zIndex of open dialogs|>|elIndex|int|position in wich dialog is stored in openDialogs|>|count|int|number of open dialogs|>|isFirstTimeOpen|boolean|-|



#### _getElementIndex

> Return position in wich dialog is stored in openDialogs

>|Parameter|Type|description|
>|---|---|---|
>|openDialogs|object|Store node and zIndex of open dialogs|

>|Return|description|
>|---|---|
>|int|-|



#### _getLastDialogZindex

> Return last open dialog zIndex

>|Parameter|Type|description|
>|---|---|---|
>|openDialogs|object|Store node and zIndex of open dialogs|

>|Return|description|
>|---|---|
>|int|-|



#### _handleDialogCenter

> Place dialog on center of window



#### _handleDialogResizePosition

> On window resize dialogs will be centered depending its position

>|Parameter|Type|description|
>|---|---|---|
>|event|object|window resize event|



#### _handleDialogScale

> Place dialog on scale



#### _handleResizeHooked

> Hook dialog right or bottom when do window resize reach edge of window

>|Parameter|Type|description|
>|---|---|---|
>|windowWidth|int|-|>|windowHeight|int|-|



#### _handleResizeLimits

> Push dialog to right or to top depending if reach right or bottom window limit

>|Parameter|Type|description|
>|---|---|---|
>|windowWidth|int|-|>|windowHeight|int|-|



#### _initializeScalePosition

> Itialize _data.scalePosition, top lace dialog correctly



#### _removeDesktopFunctionality

> Remove desktop functionality on small devices view



#### _removeResizeSizes

> Re-establishes resize dialog sizes



#### _removeResizeSizes

> Store sizes of resize dialog and remove that size from the dialog



#### _resizeCalcs

> Do resize in all directions

>|Parameter|Type|description|
>|---|---|---|
>|resizer|object|resizer node|>|type|string|resize type, height, width or corner|>|direction|string|side of dialog that is being resize|>|windowWidth|int|-|>|windowHeight|int|-|>|startX|int|position of Xclient when clicking to initialize resize|>|startY|int|position of Yclient when clicking to initialize resize|>|startWidth|int|dialog width when start resize|>|startHeight|int|dialog height when start resize|>|event|object|mouse event|



#### _resizeWindowPosition

> Control when dialog reach limits of window when doresize

>|Parameter|Type|description|
>|---|---|---|
>|windowWidth|int|-|>|windowHeight|int|-|



#### _undoMaximize

> Return to its size and place before maximized

>|Parameter|Type|description|
>|---|---|---|
>|resizer|object|store dialog resize nodes|>|maximize|object|node that apply maximized|>|minBar|object|minimize bar node|



#### _undoMinimize

> Return to its size and place before minimized

>|Parameter|Type|description|
>|---|---|---|
>|resizer|object|store dialog resize nodes|>|maximize|object|node that apply minimized|



#### _updateWindowResizeBehavior

> Establishe status of window resize (increase or decrease)

>|Parameter|Type|description|
>|---|---|---|
>|windowWidth|int|-|



#### _updateZindex

> Update dialog zIndex

>|Parameter|Type|description|
>|---|---|---|
>|isFirstTimeOpen|boolean|-|



#### _verifyScreenResolution

> Control different versions of screens



#### private1

> Activate drag functionality



#### private2

> Activate drag functionality

>|Parameter|Type|description|
>|---|---|---|
>|ppppp1|int|-|>|pppp2|int|-|







