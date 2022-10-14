import React, { Component, useContext, useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "../../../components/Icon/Icon";
import { UserContext } from "../../../layout/DashboardLayout";
import { Collapse } from "react-bootstrap";
import authService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './admin.component.css';
import { GoBack } from "../../../components/back/go-back";

const Admin = (props: any) => {

  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [dynamicContent, setDynamicContent] = useState('');

  const { dashboardContext, setDashboardContext } = useContext(UserContext);

  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    fetchData();
    return () => {
      isMounted = false;
    };
  });

  const fetchData = () => {
    UserService.getAdminBoard().then(response => {
      if (response && response.data) {
        setDynamicContent(response.data);
        setError(false);
      }
      else {
        setError(true);
      }
    }).catch((error: any) => {
      setError(true);
    });
  }




  if (error && isMounted)
    navigate('/login');



  return (
    <Container fluid>
      <Row >
        <Collapse in={dashboardContext.showSidebar && authService.isLoggedIn()}>
          <Col sm="2">
            <div >
              <Navigation

                // you can use your own router's api to get pathname
                activeItemId="/students"
                onSelect={({ itemId }) => {
                  // maybe push to the route
                  console.log("Item id=>", itemId);
                  if(!itemId.includes('#'))
                  navigate(itemId);
                }}
                items={[
                  {
                    title: 'শিক্ষার্থীগণ',
                    itemId: '/admin-dashboard/students',
                    elemBefore: () => <Icon name="bi-mortarboard" />,
                  },
                  {
                    title: 'শিক্ষকমণ্ডলী',
                    itemId: '/admin-dashboard/teachers',
                    elemBefore: () => <Icon name="bi-mortarboard-fill" />,
                  },
                  {
                    title: 'উপস্থিতি',
                    itemId: '#1',
                    elemBefore: () => <Icon name="bi-clipboard2" />,
                    subNav: [
                      {
                        title: 'ছাত্রছাত্রীদের',
                        itemId: '/admin-dashboard/student-attendence',
                        elemBefore: () => <Icon name="bi-mortarboard" />,
                      },
                      {
                        title: 'কর্মচারীগণের',
                        itemId: '/admin-dashboard/staff-attendence',
                        elemBefore: () => <Icon name="bi-mortarboard-fill" />,
                      },
                    ],
                  },
                  {
                    title: 'একাডেমিক',
                    itemId: '#2',
                    elemBefore: () => <Icon name="bi-bank" />,
                    subNav: [
                      {
                        title: 'শ্রেণী',
                        itemId: '/management/teams/k',
                        elemBefore: () => <Icon name="bi-diagram-3" />
                      },
                      {
                        title: 'শাখা',
                        itemId: '/management/teams/p',
                        elemBefore: () => <Icon name="bi-intersect" />
                      },
                      {
                        title: 'বিষয়',
                        itemId: '/management/teams/e',
                        elemBefore: () => <Icon name="bi-book" />
                      },
                    ],
                  },
                  {
                    title: 'নোটিশ বোর্ড',
                    itemId: '/management/hs1',
                    elemBefore: () => <Icon name="bi-megaphone" />
                  },
                  {
                    title: 'ভর্তি',
                    itemId: '#3',
                    elemBefore: () => <Icon name="bi-clipboard2-check-fill" />,
                    subNav: [
                      {
                        title: 'আবেদনকারী',
                        itemId: '/management/asar',
                        elemBefore: () => <Icon name="bi-journal" />
                      },
                      {
                        title: 'প্রবেশপত্র',
                        itemId: '/management/asa2r',
                        elemBefore: () => <Icon name="bi-credit-card-2-front" />
                      },
                    ]
                  },
                  {
                    title: 'পরীক্ষা',
                    itemId: '#4',
                    elemBefore: () => <Icon name="bi-award" />,
                    subNav: [
                      {
                        title: 'পরীক্ষা',
                        itemId: '/management/asa5',
                        elemBefore: () => <Icon name="bi-credit-card-2-front" />
                      },
                      {
                        title: 'গ্রেডিং',
                        itemId: '/management/asa6',
                        elemBefore: () => <Icon name="bi-bar-chart" />
                      }
                    ]
                  },
                  {
                    title: 'ফলাফল',
                    itemId: '#5',
                    elemBefore: () => <Icon name="bi-clipboard-pulse" />,
                    subNav: [
                      {
                        title: 'রেজাল্ট',
                        itemId: '/management/asae5',
                        elemBefore: () => <Icon name="bi-clipboard-check" />
                      },
                      {
                        title: 'নম্বর',
                        itemId: '/management/asae6',
                        elemBefore: () => <Icon name="bi-clipboard2-check" />
                      },
                      {
                        title: 'উত্তীর্ণ',
                        itemId: '/management/asae613',
                        elemBefore: () => <Icon name="bi-clipboard-data-fill" />
                      },
                      {
                        title: 'পুনঃভর্তি',
                        itemId: '/management/asae612',
                        elemBefore: () => <Icon name="bi-arrow-counterclockwise" />
                      },
                    ]
                  },
                  {
                    title: 'HRM',
                    itemId: '#6',
                    elemBefore: () => <Icon name="bi-people" />,
                    subNav: [
                      {
                        title: 'Employee',
                        itemId: '/management/asa50',
                        elemBefore: () => <Icon name="bi-person" />
                      },
                      {
                        title: 'Leave',
                        itemId: '/management/asa60',
                        elemBefore: () => <Icon name="bi-heart-pulse" />
                      }
                    ]
                  },
                  {
                    title: 'Account',
                    itemId: '#7',
                    elemBefore: () => <Icon name="bi-bank" />,
                    subNav: [
                      {
                        title: 'Heads',
                        itemId: '/management/xasb2501',
                        elemBefore: () => <Icon name="bi-diagram" />
                      },
                      {
                        title: 'Budgets',
                        itemId: '/management/iyi',
                        elemBefore: () => <Icon name="bi-cart" />
                      },
                      {
                        title: 'Fees',
                        itemId: '/management/fdf',
                        elemBefore: () => <Icon name="bi-journal-check" />
                      },
                      {
                        title: 'Income',
                        itemId: '/management/wwe',
                        elemBefore: () => <Icon name="bi-file-earmark-plus" />
                      },
                      {
                        title: 'Expense',
                        itemId: '/management/yttr',
                        elemBefore: () => <Icon name="bi-file-earmark-minus" />
                      }
                    ]
                  },
                  {
                    title: 'Payroll',
                    itemId: '#8',
                    elemBefore: () => <Icon name="bi-currency-dollar" />,
                    subNav: [
                      {
                        title: 'Salary',
                        itemId: '/management/asa5x0',
                        elemBefore: () => <Icon name="bi-cash-coin" />
                      },
                      {
                        title: 'Payment',
                        itemId: '/management/asa6x0',
                        elemBefore: () => <Icon name="bi-cash-stack" />
                      }
                    ]
                  },
                  {
                    title: 'Users',
                    itemId: '/management/members/ma1',
                    elemBefore: () => <Icon name="bi-people-fill" />,
                  },
                  {
                    title: 'Reports',
                    itemId: '/management/members/ma2',
                    elemBefore: () => <Icon name="bi-file-earmark-spreadsheet" />,
                  },
                ]}
              />
            </div>
          </Col>
        </Collapse>
        <Col sm="10">
          <Container className="content-place-holder mt-2">
            <GoBack />
            <Outlet />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;