import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Auth/Login";
import AppLayout from "./Pages/AppLayout";
import Dashboard from "./Pages/Dashboard";
import Book from "./Pages/Book";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Emprunt from "./Pages/Emprunt";
import Student from "./Pages/Student";
import { BookProvider } from "./Context/BookContext";
import { StudentProvider } from "./Context/StudentContext";
import { UserProvider } from "./Context/UserContext";
import { EmpruntProvider } from "./Context/EmpruntContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <BookProvider>
                  <StudentProvider>
                    <UserProvider>
                      <EmpruntProvider>
                        <AppLayout />
                      </EmpruntProvider>
                    </UserProvider>
                  </StudentProvider>
                </BookProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dash" />} />
            <Route path="dash" element={<Dashboard />} />
            <Route path="book" element={<Book />} />
            <Route path="emprunt" element={<Emprunt />} />
            <Route path="user" element={<User />} />
            <Route path="student" element={<Student />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
