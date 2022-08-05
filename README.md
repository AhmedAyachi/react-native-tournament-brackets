## What is this?
This is a react native library for generating tournament brackets.
Supports both single and double elimination tournaments.
## Components 
- SingleEliminationView
- DoubleEliminationView
## Props
Both components listed above have the exact same props:
 
|Prop Name|Type|Description|
|:----:|:----:|:-----------|
|data|Object|Data to use to draw the brackets.|
|renderMatch|React Component|Optional, displays a custom MatchView Component|
|stroke|String|Optional, sets the matchs views connectors color, default: orange|
|strokeWidth|Number|Optional, sets the matchs views connectors width, default: 2|
### Data
An object containing at least one property **participants**,
An array of objects, each containing at least two properties **id** and **name**.
> Minimum requirements to get to the brackets view
> 
    {"participants": [{"id": "p0","name": "adrian"},{"id": "p1","name":"kevin"},{"id": "p2","name": "lisa"},{"id": "p3","name":"scott"},{"id": "p4","name": "bert"},{"id": "p5","name":"arthur"},{"id": "p6","name": "drew"},{"id": "p7","name":"ernie"},{"id": "p8","name": "michelle"},{"id": "p9","name": "andrew"},{"id": "p10","name": "johan"},{"id": "p11","name": "ian"},{"id": "p12","name": "monica"},{"id": "p13","name": "steve"},{"id": "p14","name": "red"},{"id": "p15","name": "robert"}]}  
  **SingleEliminationView Extra Data Properties :**
|Prop Name|Type|Description|
|:-------:|:--:|:---------:|
|rounds|**Round**[]|used to target each round matches|
**Round**
|Prop Name|Type|Description|
|:-------:|:--:|:---------:|
|index|Selector property|used to target rounds by index
|title|String|sets the round header text
|matches|**Match**[]|matches of the current round 
**Match**
An object used to extend the match data object.
This object has two types of properties:
- Value property
 - Selector property
 
**Value properties**
added to the match of the current round if found using its selector property.
>If the default Match Component were used, the property date value would be displayed on top otherwise **Not Scheduled**  is shown

**Selector properties**
used to select a match from the current round.
These are all the selectors in descending priority order :
|Name|Description|
|:------:|:------------:|
|index|used to target matches by index|
|participantIds|used to target the match whose participants are those with such ids|
|winnerId|used to target the match whose participants array includes such id|
> **winnerId** is the same as participantIds with only one id but a shortcut in order to skip setting the same id twice to specify the participant as a winner
> 
***Note***
If multiple selector properties found, the one with the highest priority is used as a selector and the others as  value properties.
This is useful if you want to specify a match participants

    {"index":0,"participantIds:["p1","p2"],"winnerId":"p1"}
This will force the participants of the match with such index to be those with such ids 
> If no selector property were found, the current index of the match in the json matches array would be used as a selector
> ***Note***
> All the extra properties listed above are not required in order to create the tournament brackets

**DoubleEliminationView Extra Data Properties :**
|Prop Name|Type|Description|
|:-------:|:--:|:---------:|
|championship|SingleEliminationDataOBject|used for the championship brackets (no praticipants property needed)|
|elimination|SingleEliminationDataOBject| same as championship
|final|{"match":**Match**}|sets the grand final match data