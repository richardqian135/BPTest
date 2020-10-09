import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const DayCard = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)
  const imgURL = `owf owf-${reading.weather[0].id} owf-5x`
  const fahrenheit = Math.round(reading.main.temp);

  return (
    <div className="slider_children">
      <Card style={{
        margin: '5px 2px',

        display: 'inline-block',

      }}
      >
        <CardContent>
          <Typography style={{ fontSize: 28, color: 'green' }} color="textSecondary" gutterBottom>
            <h4 className="card-title">{moment(newDate).format('dddd')}</h4>
            <h6 className="card-title">{moment(newDate).format('MMMM Do')}</h6>
          </Typography>
          <Typography variant="h5" component="h2">
            <div><span>{fahrenheit + "°"}</span> </div>
          </Typography>
          <Typography style={{ marginBottom: 12, }} color="textSecondary">
            <i className={imgURL} alt="..."
              style={{ maxHeight: '80px',  color: '#87CEFA'}} />
          </Typography>
          <Typography variant="body2" component="p" style={{ fontSize: 18 }}>

            {reading.weather[0].description}

          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default DayCard;