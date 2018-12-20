package com.qf.dao;

import com.qf.pojo.po.User;

import java.util.List;

public interface UserDao {
    public User getUser(User user);
    public List<User> listUser();
    public void addUser(User user);
    public User getUserById(int id);
    public void updateUser(User user);
    public void removeUser(int id);
}
