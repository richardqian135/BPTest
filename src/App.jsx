import React from 'react';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import axios from 'axios';
import DayCard from './components/DayCard';
import './App.css';
import Property from './components/ApplicationProperty';

const App = () => {
	const { register, handleSubmit, errors } = useForm();
	const [zip, SetZip] = useState('60521');
	const [weatherdays, SetWeatherdays] = useState([]);
	const [errtext, SetErrtext] = useState('');
	const [errcode, SetErrcode] = useState('');
	const [haserror, SetHaserror] = React.useState('');
	const [cityname, SetCityname] = useState('Hinsdale');
	const [countryname, SetCountryname] = useState('USA');

	const onSubmit = data => {
		const zipobj = JSON.parse(JSON.stringify(data));

		SetZip(zipobj['zipcode']);


	};

	const weatherURL = Property.url + zip + '&units=imperial&APPID=' + Property.key;

	useEffect(() => {
		axios
			.get(weatherURL)
			.then(response => {
				const dailyData = response.data.list.filter(re => re.dt_txt.includes("18:00:00"))
				const city = JSON.parse(JSON.stringify(response.data.city));
				SetCityname(city["name"]);
				SetCountryname(city["country"]);
				SetWeatherdays(dailyData);

			})
			.catch((error) => {
				const err = JSON.parse(JSON.stringify(error.response.data));
				SetHaserror(true);
				SetErrcode(err["cod"]);
				SetErrtext(err["message"]);
				SetServerError();
			});

	}, [zip]);

	function SetServerError() {
		return (
			<div>
				<div><h3>API Error</h3></div>
				<div>code:{errcode}</div>
				<div>message:{errtext}</div>
				<div>
					<button onClick={refreshPage}>Try Again</button>
				</div>
			</div>

		)
	};

	function refreshPage() {
		window.location.reload(false);
	};


	function ZipForm() {
		return (
			<form onSubmit={handleSubmit(onSubmit)} data-testid="form">
				<label><h3>Please enter zipcode:</h3></label>
				<input name="zipcode" defaultValue="60521" ref={register({ required: true })} />

				{errors.zipcodeRequired && <span>This field is required</span>}

				<input type="submit" />
			</form>
		)
	}

	return haserror ? (
		<SetServerError></SetServerError>

	) : (

			<div align='center'>
				<div><h1 >Five Day Weather Forecast</h1></div>
				<ZipForm></ZipForm>
				<div><h3>{cityname}, {countryname}</h3></div>
				<div className="slider">
					{weatherdays.map((reading, index) => <DayCard reading={reading} key={index} />)}
				</div>
			</div>

		)
}

export default App;