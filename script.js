// Поиск курсов на странице EduSync
const search = document.getElementById("search");
const courses = document.querySelectorAll(".course");
const message = document.getElementById("message");

search.addEventListener("input", function () {
  const query = search.value.toLowerCase();
  let found = 0;

  courses.forEach(function (course) {
    const title = course.querySelector("h3").textContent.toLowerCase();

    if (title.includes(query)) {
      course.style.display = "block";
      found++;
    } else {
      course.style.display = "none";
    }
  });

  if (found === 0) {
    message.textContent = "Курсы не найдены.";
  } else {
    message.textContent = "Найдено курсов: " + found;
  }
});

// Демонстрация открытия курса
function openCourse(courseName) {
  alert("Вы открыли курс: " + courseName);
}
// Улучшение: добавлена обработка поиска курсов по названию.
