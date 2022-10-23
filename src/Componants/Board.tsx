import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import DraggableCard from "./DragabbleCard"

const Wrapper = styled.div`
    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
    flex-grow: 1;
    transition: background-color .3s ease-in-out;
`

interface IAreaProps{
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard key={toDo} index={index} toDo={toDo}></DraggableCard>
                        ))}
                        {magic.placeholder}
                    </Area>)}
            </Droppable>
        </Wrapper>
    )
}

export default Board