window.onload = function () {
  let input_content = document.getElementById(`input_content`);
  let input_date = document.getElementById(`input_date`);
  let start_time = document.getElementById(`start_time`);
  let end_time = document.getElementById(`end_time`);
  let modal = document.getElementById("modal");

  for (let days = 1; days <= 31; days++) {
    document.getElementById(`d${days}`).addEventListener("click", function () {
      console.log(`days Editor open: d${days}`);
      modal.style.display = "block";
      console.log(days);
      if (days < 10)
        document.getElementById("input_date").value = "2020-11-0" + days;
      else document.getElementById("input_date").value = "2020-11-" + days;

      if (
        document
          .getElementById(`d${days}`)
          .getElementsByClassName(`event`)[0] == "[object HTMLDivElement]"
      ) {
        input_content.value = document
          .getElementById(`d${days}`)
          .getElementsByClassName("event-desc")[0]
          .textContent.trim();
        let s_e_time = document
          .getElementById(`d${days}`)
          .getElementsByClassName("event-time")[0]
          .textContent.split(` to `);
        start_time.value = s_e_time[0].trim();
        end_time.value = s_e_time[1].trim();
        document.getElementsByClassName(
          `modal-content`
        )[0].childNodes[3].textContent = `일정 수정`;

        document.getElementById(`btn_del`).style.display = `block`;
      } else {
        document.getElementById(`btn_del`).style.display = `none`;

        input_content.value = ``;
        start_time.value = ``;
        end_time.value = ``;
        document.getElementsByClassName(
          `modal-content`
        )[0].childNodes[3].textContent = `일정 추가`;
      }
    });
  }

  let btn_close = document.getElementById("btn_close");
  btn_close.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    console.log(`days Editor closed`);
  });

  document.getElementById(`btn_add`).addEventListener(`click`, function (e) {
    let select_date = input_date.value.split(`-`);
    if (select_date[2][0] == "0") {
      class_check(select_date[2][1]);
    }
    class_check(select_date[2]);
  });

  document.getElementById(`btn_del`).addEventListener(`click`, function (e) {
    let days = 0;
    let select_date = input_date.value.split(`-`);
    if (select_date[2][0] == "0") {
      days = select_date[2][1];
    } else {
      days = select_date[2];
    }
    document
      .getElementById(`d${days}`)
      .getElementsByClassName(`event`)[0]
      .remove();
    modal.style.display = `none`;
  });
};

let class_check = async (select_date) => {
  /*try {*/
  if (document.getElementById(`d${select_date}`).children.length == 2) {
    update_days(select_date);
    console.log(`update_days`);
  } else {
    insert_days(select_date);
    console.log(`insert_days`);
  }
  /*} catch {
    update_days(select_date);
    console.log(`update_days`);
  }*/
};

let insert_days = async (select_date) => {
  let event = document.createElement(`div`);
  event.className = `event`;

  let event_desc = document.createElement(`div`);
  event_desc.className = `event-desc`;
  event_desc.textContent = input_content.value;

  let event_time = document.createElement(`div`);
  event_time.className = `event-time`;
  event_time.textContent = `${start_time.value} to ${end_time.value}`;

  event.appendChild(event_desc);
  event.appendChild(event_time);

  document.getElementById(`d${select_date}`).appendChild(event);

  console.log(
    `days insert\ndays: ${select_date}\ndesc: ${
      document.getElementById(`input_content`).value
    }\ntims: ${document.getElementById(`start_time`).value} to ${
      document.getElementById(`end_time`).value
    }`
  );
  modal.style.display = `none`;
};

let update_days = async (select_date) => {
  console.log(
    `days update\nold========\ndays: ${select_date}\ndesc: ${document
      .getElementById(`d${select_date}`)
      .getElementsByClassName("event-desc")[0]
      .textContent.trim()}\ntims: ${document
      .getElementById(`d${select_date}`)
      .getElementsByClassName("event-time")[0]
      .textContent.trim()}\nnew========\ndays: ${select_date}\ndesc: ${
      document.getElementById(`input_content`).value
    }\ntims: ${document.getElementById(`start_time`).value} to ${
      document.getElementById(`end_time`).value
    }`
  );
  document
    .getElementById(`d${select_date}`)
    .getElementsByClassName(
      "event-desc"
    )[0].textContent = `${input_content.value}`;
  document
    .getElementById(`d${select_date}`)
    .getElementsByClassName(
      "event-time"
    )[0].textContent = `${start_time.value} to ${end_time.value}`;
  modal.style.display = "none";
  console.log(`days update: Success`);
};
