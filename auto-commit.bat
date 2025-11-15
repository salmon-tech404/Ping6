@echo off
:: Thay đổi thư mục dự án
cd /d/Project/Ping06

:: Hiển thị trạng thái git
git status

:: Thêm tất cả file thay đổi
git add .

:: Nhập message commit
set /p msg="Enter commit message: "

:: Commit
git commit -m "%msg%"

:: Push lên GitHub
git push origin main

echo.
echo Done! Code has been pushed to GitHub.
pause
