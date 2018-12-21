package com.qf.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qf.dao.UserDao;
import com.qf.pojo.po.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserAction {
    @Autowired
    private UserDao userDao;

    @ResponseBody
    @RequestMapping(value="/user")
    public User getUser(User user){
        return userDao.getUser(user);
    }


    @ResponseBody
    @RequestMapping("/listUser")
    public Map listUser(){
        List<User> la = userDao.listUser();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total",la.size());
        map.put("rows",la);
        return map;
    }

    @ResponseBody
    @RequestMapping("/addUser")
    public void  addUser(User user) {
        userDao.addUser(user);
    }

    @ResponseBody
    @RequestMapping("/toUpdateUser/{id}")
    public User getUserById(@PathVariable("id") Integer id){
        int id1 = id.intValue();
        return userDao.getUserById(id1);
    }
    @ResponseBody
    @RequestMapping("/updateUser")
    public void updateUser(User user){
        userDao.updateUser(user);
    }

    @ResponseBody
    @RequestMapping("/removeUser/{id}")
    public void removeUser(@PathVariable("id") Integer id){
        int id1 = id.intValue();
        userDao.removeUser(id1);
    }


}
