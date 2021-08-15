console.log(window.Redux);

const { createStore } = window.Redux;

//Setup Redux Store

const initialState = JSON.parse(localStorage.getItem("hobby_list")) || [];

const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }

    default:
      return state;
  }
};

const store = createStore(hobbyReducer);

// -------------------------

// Render Redux Hobby List
const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector("#hobbyListId");
  if (!ulElement) return;

  ulElement.innerHTML = "";

  for (const hobby of hobbyList) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }
};

// Render Initial Hobby List
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

// Handle Form Submit
const hobbyFormElement = document.querySelector("#hobbyFormId");

if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const hobbyTextElement = hobbyFormElement.querySelector("#hobbyTextId");
    if (!hobbyTextElement) return;
    console.log("SUBMIT", hobbyTextElement.value);

    const action = {
      type: "ADD_HOBBY",
      payload: hobbyTextElement.value,
    };

    store.dispatch(action);

    // reset form
    hobbyFormElement.reset();
  };

  hobbyFormElement.addEventListener("submit", handleFormSubmit);
}

store.subscribe(() => {
  const newHobbyList = store.getState();
  renderHobbyList(store.getState());
  localStorage.setItem("hobby_list", JSON.stringify(newHobbyList));
});
