'use client';

import Doctor from "@/components/Doctor/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface TimeSlot {
  weekDays: string[],
  scheduleTime: string,
  price: string
};

type DoctorType = {
  _id: string,
  name: string,
  email: string,
  profilePic: string,
  password: string,
  role: string,
  doctorRole: string,
  timeSlots: TimeSlot[]
};

const CategoryDoctors = () => {
  const { category } = useParams();

  const [doctorCategory, setDoctorCategory] = useState('');

  useEffect(() => {
    if (category === 'regulardoctors') {
      document.title = 'Doctorii | Regular Doctors';
      setDoctorCategory('Regular Doctors');
    }
    else if (category === 'childandgynecologistdoctors') {
      document.title = 'Doctorii | Child And Gynecologist Doctors';
      setDoctorCategory('Child And Gynecologist Doctors');
    }
    else if (category === 'heartspecialistdoctors') {
      document.title = 'Doctorii | Heart Specialist Doctors';
      setDoctorCategory('Heart Specialist Doctors');
    }
    else if (category === 'bonespecialistdoctors') {
      document.title = 'Doctorii | Bone Specialist Doctors';
      setDoctorCategory('Bone Specialist Doctors');
    }
    else if (category === 'eyespecialistdoctors') {
      document.title = 'Doctorii | Eye Specialist Doctors';
      setDoctorCategory('Eye Specialist Doctors');
    }
  }, [category]);

  const { data: doctors = [] } = useQuery({
    queryKey: ['doctors', category],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/users/doctors/${category}`);

        if (response?.status === 200) {
          return response?.data?.filter((doctor) => doctor?.doctorRole !== 'Emergency' && doctor?.chamberLocation);
        }
      } catch (error: any) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="py-20">
      <h2 className="text-center text-3xl font-semibold text-sky-600">
        {doctorCategory}
      </h2>
      <div className="max-w-7xl mx-auto py-16 flex justify-center items-center flex-wrap gap-16 md:gap-7">
        {
          doctors?.length === 0 ? (
            <h4 className="text-center text-2xl font-semibold">No {doctorCategory} Are Available Now...</h4>
          ) : (
            doctors?.map((doctor: DoctorType) => <Doctor key={doctor?._id} doctor={doctor} />)
          )
        }
      </div>
    </section>
  )
}

export default CategoryDoctors;