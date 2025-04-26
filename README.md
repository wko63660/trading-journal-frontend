# Trading Journal – Frontend (React + TypeScript)

This is the frontend for the Trading Journal app — a responsive web interface that allows users to log in, import trades, and visualize performance metrics. It connects to the Spring Boot backend using Axios and manages authentication via Context + JWT.


## Features Implemented

1. JWT-based login/logout

2. AuthContext managing accessToken, username, email

3. Persistent session via localStorage

4. Sidebar navigation

5. Axios-based API interaction

6 Trade import by TLG files

![image](https://github.com/user-attachments/assets/05e8fb82-8b80-4e57-9b7e-161864cca9a0)
![Screenshot 2025-04-15 234723](https://github.com/user-attachments/assets/c34b1459-bfa8-411b-991e-4580250786bd)


![image](https://github.com/user-attachments/assets/1d5d963a-34fa-4107-8255-4b7f98e46251)
User can download the trades record from ib and improt the trades through the add new trades page, or add trades manually.

![image](https://github.com/user-attachments/assets/7fdc57a6-9540-4de0-9afe-ad8b445f6d72)
Once TLG files are imported, the trades would be shown the My Trades page. 
