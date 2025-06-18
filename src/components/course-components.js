import React, { useEffect, useState } from "react";
//導入連結
import { data, useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const Coursecomponents = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  //資料型態是物件、陣列或要等 API 回傳？→ 用 null
  // 這樣一開始就能明確表示「目前還沒資料」。
  // 資料型態是字串、數字、表單欄位？→ 用空字串或 0
  // 這樣比較直觀，且和預期型別一致。
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
            console.log(data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "student") {
        CourseService.getEnrolledCourse(_id)
          .then((data) => {
            // console.log(data);
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能看到課程</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseData.map((course) => {
            return (
              <div
                className="card"
                style={{ width: " 18rem ", margin: " 1rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">課程名稱{course.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }} className="card-text">
                    {course.description}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    學生人數{course.students.length}
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    課程價格{course.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Coursecomponents;
