import React, { Component, useContext, useState } from "react";
import UserService from "../../../services/user.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "../../../components/Icon/Icon";
import { UserContext } from "../../../layout/DashboardLayout";

const  Admin=(props:any) => {

  const { dashboardContext, setDashboardContext } = useContext(UserContext);
    


    return (
      <Container  fluid>
        <Row>
            <Col hidden={dashboardContext.showSidebar} sm="2"> 
            <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <Icon name="bi-inbox" />,
              },
              {
                title: 'Management',
                itemId: '/management',
                elemBefore: () => <Icon name="bi-house" />,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ]}
          />
          </Col>
            <Col sm="10">Body</Col>
        </Row>
      </Container>
    );
  }

export default Admin;