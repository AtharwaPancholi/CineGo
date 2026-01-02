import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    setBookings(dummyBookingData)
    setIsLoading(false)
  }

  useEffect(() => {
    getAllBookings()
  }, [])

  return !isLoading ? (
    <>
      <Title text1="List" text2="Bookings" />

      <div className="max-w-6xl mt-6 overflow-x-auto rounded-lg">
        <table className="w-full border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-primary/20 text-white text-left">
              <th className="p-3 font-medium">User Name</th>
              <th className="p-3 font-medium">Movie Name</th>
              <th className="p-3 font-medium">Show Time</th>
              <th className="p-3 font-medium">Seats</th>
              <th className="p-3 font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-b border-primary/20 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-3 min-w-[180px]">
                  {item.user.name}
                </td>

                <td className="p-3">
                  {item.show.movie.title}
                </td>

                <td className="p-3">
                  {dateFormat(item.show.showDateTime)}
                </td>

                <td className="p-3">
                  {Object.values(item.bookedSeats).join(', ')}
                </td>

                <td className="p-3 font-medium">
                  {currency} {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default ListBookings
