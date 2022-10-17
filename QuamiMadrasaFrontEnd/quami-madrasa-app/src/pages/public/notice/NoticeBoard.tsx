import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import noticeService from '../../../services/notice.service';

const NoticeBoard = () => {

    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
  
        noticeService.getActiveNotices().then((resp:any) => {
        if (resp && resp.status == 200) {
            setRowData(resp.data);
            setIsLoading(false);
        }
      })
  
    }, []);

    return (
        <div className="container py-3">
        <div className="d-flex align-content-start flex-wrap">
        {
          rowData.map((notice: any, index: number) => {
            return (
              <Card className="custom-card mr-3" key={index+'_card'} style={{ width: '24rem' }}>
                <Card.Body>
                  <Card.Title>{notice.title}</Card.Title>
                  <Card.Subtitle className="mb-2">{notice.id}</Card.Subtitle>
                  <Card.Text>
                    {notice.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
      </div>
    );
};

export default NoticeBoard;