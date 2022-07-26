import React, { useEffect , useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
const [quizes, setQuizes] = useState([])
 console.log(quizes)
useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questions) => setQuizes(questions));
}, []);

function handleChangeAnswer(id , correctIndex){
  console.log(id)
  fetch(`http://localhost:4000/questions/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({correctIndex}),
  })
.then((r)=>r.json)
.then(quizupdated=>{
  const updatedQuiz= quizes.map((quiz)=>{
    if(quiz.id===quizupdated.id) {return quizupdated}else
    {return quiz}
  })
  setQuizes(updatedQuiz)
})

}
function handleDeleteItem(id){
fetch(`http://localhost:4000/questions/${id}`,{
  method:'DELETE'
})
.then(r=>r.json())
.then(()=>{
 const notDeleted=quizes.filter((quiz)=>quiz.id !==id)
 setQuizes(notDeleted)
})
}
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizes.map((question=>{
        return (
          <QuestionItem
            key={question.id}
            question={question}
            handleChangeAnswer={handleChangeAnswer}
            handleDeleteItem={handleDeleteItem}
          />
        );

      }))}</ul>
    </section>
  );
}
export default QuestionList;