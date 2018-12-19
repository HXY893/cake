package com.qf.serivce.impl;

import com.alibaba.fastjson.JSONObject;
import com.qf.dao.AdminDao;
import com.qf.pojo.po.AdminUser;
import com.qf.serivce.AdminService;
import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/12/18.
 */
@Service
public class AdminServiceImpl implements AdminService {
    private final static Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);
@Autowired
private AdminDao adminDao;
    @Override
    public JSONObject listAdmin(JSONObject jsonObject) {
        JSONObject jo=new JSONObject();

        try {
            List<AdminUser> rows=adminDao.listAdmin(jsonObject);
            Long total=adminDao.listCount(jsonObject);
            jo.put("rows",rows);
            jo.put("total",total);
        } catch (Exception e) {
            logger.info(e.getMessage(),e);
            e.printStackTrace();
        }

        return jo;
    }

    @Override
    public AdminUser getUserByuid(int id) {
      AdminUser user=null;

            try {
                user=  adminDao.getUserByuid(id);
            } catch (Exception e) {
                logger.info(e.getMessage(),e);
                e.printStackTrace();
            }
            return user;
        }

    @Override
    public int updateUser(AdminUser user) {
        int i=0;
        try {
            i=adminDao. updateUser(user);
        } catch (Exception e) {
            logger.info(e.getMessage(),e);
            e.printStackTrace();
        }

        return i;
    }

    @Override
    public int deleteAdmin(int id) {
        int i=0;
        try {
            i=adminDao.deleteAdmin(id);
        } catch (Exception e) {
            logger.info(e.getMessage(),e);
            e.printStackTrace();
        }
        return i;
    }

    @Override
    public int addAdmin(AdminUser user) {
      int i=0;
        try {
            i=adminDao.addAdmin(user);
        } catch (Exception e) {
            logger.info(e.getMessage(),e);
            e.printStackTrace();
        }
        return i;
    }
}
