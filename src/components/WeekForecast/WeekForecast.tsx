import { memo, useEffect, useState } from 'react';
import getWeekForecast from '../../api/GET/weekForecast';
import { useAppSelector } from '../../hooks/redux';
import { Box, Text } from '@chakra-ui/react';
import { WeatherResponse } from '../../types/weather.type';
import { normalizeParams } from '../../utils/normalizeParams';

function WeekForecast() {
	const { city } = useAppSelector(state => state.selectedCity);
	const [days, setDays] = useState<WeatherResponse[]>([])

	useEffect(() => {
		const getData = async () => {
			const response = await getWeekForecast(city!);

			setDays(response.list)
		}

		getData()
	}, [city])

	return (
		<Box justifyContent={'space-around'} gap={10} flexWrap={'wrap'} display={'flex'}>
			{days.map(({ main, wind }, i) => (
				<Box
					key={crypto.randomUUID()}
					display={'flex'} 
					flexDirection={'column'} 
					justifyContent={'space-around'} 
					p={2} minW={150} 
					minH={150} 
					bg={'gray.100'} 
					rounded={'xl'}
				>
					<Text fontWeight={'bold'} fontSize={'xx-large'} as={'h1'}>Day: {i + 1}</Text>
					<Box>
						<Text fontStyle={'italic'}>Temperature: {normalizeParams(main.temp)}&deg;</Text>
						<Text fontStyle={'italic'}>Humidity: {normalizeParams(main.humidity)}</Text>
						<Text fontStyle={'italic'}>Wind: {normalizeParams(wind.speed)}</Text>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default memo(WeekForecast);