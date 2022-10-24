import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardBgColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`

interface IDraggabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggabbleCardProps) {

    return (
        <Draggable draggableId={toDoId+""} index={index}>
            {(provided, snapshot) => (
                <Card
                isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {toDoText}
                </Card>)}
        </Draggable>
    )
}

export default React.memo(DraggableCard);