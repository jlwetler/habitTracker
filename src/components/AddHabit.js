import styled from "styled-components";

export default function AddHabit({ days, setDays, newHabit, setNewHabit, AddNewHabit, setAddNewHabit, }) {

    return(
        <NewHabitContainer>
            <input type="text" placeholder="nome do hábito" value={newHabit} onChange={e => setNewHabit(e.target.value)} required/>
            {days.map(d => 
                <div>{d.day}</div>
            )}
            <section>
                <Cancel onClick={() => setAddNewHabit(false)}>Cancelar</Cancel>     
                <Save>Salvar</Save>
            </section>     
        </NewHabitContainer>
    );
}

const NewHabitContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    height: 180px;
    background: #fff; 
    padding: 13px;
    margin: 20px auto;
    border-radius: 5px;
    input {
        font-size:20px;
        width: 85vw;
        height: 45px;
    }
    div {
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        margin: 5px 5px 0 0;
        border-radius: 5px;
        border: 1px solid #000;
    }
    section {
        width: 85vw;
        margin-top: 40px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

const Cancel = styled.button `
    border: none;
    background: #fff;
    color: #52B6FF;
`;

const Save = styled.button `
    border: none;
    width: 84px;
    height: 35px;
    background: #52B6FF;
    color: white;
    border-radius: 5px;
`;
