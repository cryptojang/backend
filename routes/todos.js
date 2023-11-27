const express = require("express");

const router = express.Router();

//이렇게 변수로 데이터 저장하면, 서버 껐다 키면 사라짐
let todoId = 1;
let todos = [{ id: 1, title: "🏋️‍♀️ 청소하기", isDone: false }];

/*
//app.js에서는 app.get 했다면 여기서는 router.get 됨 '/'는 todos의 기본 경로
router.get("/", (req, res) => {
  return res.send("Todo Router success");
});
*/

router.post("/", (req, res) => {
  // 핵심 데이터는 바디에, 메타데이터는 헤더에 적음

  //구조분해 문법으로 꺼내기. 받은 데이터는 바디에 들어있음. 중괄호 안에 키값 입력. 이거 안 하고도 req.body.title로 쓸 수 있음
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title does not exist." });
  }

  todoId++; //자기 자신 교체함

  const newTodo = { id: todoId, title, isDone: false }; //key value 같으면 생략 가능

  //리액트는 각각 새로운 요소 만들어야 해서 ... 사용
  todos.push(newTodo);

  return res.json({ todo: newTodo });
});

router.get("/", (req, res) => {
  return res.json({ todos });
});

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  //params로 주소창의 값 가져옴

  //숫자인지 파악할 때 문자열로 표현되어도
  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  let existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) {
      existTodo = v;
    }
  });

  if (!existTodo) {
    return res.status(400).json({
      message: "Not exist todo.",
    });
  }

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  let updatedTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updatedTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updatedTodo;
    } else {
      return v;
    }
  });

  if (!updatedTodo) {
    return res.status(400).json({
      message: "Not exist todo.",
    });
  }

  return res.json({ todo: updatedTodo });
});

router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;

  if (isNaN(todoId) || !title) {
    return res.status(400).json({
      message: "Not exist data.",
    });
  }

  let updatedTodo;

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updatedTodo = { id: v.id, title, isDone: v.isDone };

      return updatedTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updatedTodo });
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "Not exist data.",
    });
  }

  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v;
    }
  });

  return res.json({ message: "Deleted todo." });
});

//컴포넌트화 할때 익스포트 하는 거에 대응됨
module.exports = router;
