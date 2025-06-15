import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// This array defines each lecturer, their details, photo, and deep link
const LECTURERS = [
  // Ground Floor
  {
    displayName: 'Dr AZHAN',
    surname: 'ABD AZIZ',
    role: 'Senior Lecturer',
    photo: 'Azhan.jpg',
    floor: 'ground-floor',
    roomId: 'azhan'
  },
  {
    displayName: 'En AHMAD FAISOL',
    surname: 'YUSOF',
    role: 'Senior Lecturer',
    photo: 'Faisol.jpg',
    floor: 'ground-floor',
    roomId: 'faisol'
  },
  {
    displayName: 'Ts. MOHD NASURUDIN',
    surname: 'HASBULLAH',
    role: 'Senior Lecturer',
    photo: 'Nas.jpg',
    floor: 'ground-floor',
    roomId: 'nasurudin'
  },
  {
    displayName: 'Ts. Dr. WAN NUR RUKIAH',
    surname: 'MOHD ARSHAD',
    role: 'Senior Lecturer',
    photo: 'Wan.jpg',
    floor: 'ground-floor',
    roomId: 'wan'
  },
  // First Floor
  {
    displayName: 'En MOHD ZIKRI',
    surname: 'MOHD ZAKI',
    role: 'Lecturer',
    photo: 'Zikri.jpg',
    floor: 'first-floor',
    roomId: 'zikri'
  },
  {
    displayName: 'Pn FARAH HANNA',
    surname: '®AHMAD FUAD',
    role: 'Lecturer',
    photo: 'Farah.jpg',
    floor: 'first-floor',
    roomId: 'farah'
  },
  {
    displayName: 'Cik NOOR AINSYAH',
    surname: 'ZULKIFLI',
    role: 'Lecturer',
    photo: 'Ainsyah.jpg',
    floor: 'first-floor',
    roomId: 'ainsyah'
  },
  // Second Floor
  {
    displayName: 'Dr FAZIDAH HANIM',
    surname: 'HUSAIN',
    role: 'Lecturer',
    photo: 'Hanim.jpg',
    floor: 'second-floor',
    roomId: 'hanim'
  },
  {
    displayName: 'En MOHAMMAD NAZRIN',
    surname: 'ZAINAL ABIDIN',
    role: 'Lecturer',
    photo: 'YEN.jpg',
    floor: 'second-floor',
    roomId: 'yen'
  },
  {
    displayName: 'Dr MAYAMIN',
    surname: 'YUHANIZ',
    role: 'Lecturer',
    photo: 'Maya.jpg',
    floor: 'second-floor',
    roomId: 'maya'
  },
  {
    displayName: 'Ar. IZNNY',
    surname: 'ISMAIL',
    role: 'Lecturer',
    photo: 'Iznny.jpg',
    floor: 'second-floor',
    roomId: 'iznny'
  },
  {
    displayName: 'En MD ANWAR',
    surname: 'MD YUSOF',
    role: 'Lecturer',
    photo: 'Anwar.jpg',
    floor: 'second-floor',
    roomId: 'anwar'
  },
  {
    displayName: 'Dr NOR SYAMIMI',
    surname: 'SAMSUDIN',
    role: 'Lecturer',
    photo: 'Mimi.jpg',
    floor: 'second-floor',
    roomId: 'mimi'
  },
  {
    displayName: 'Dr FADHLIZIL FARIZ',
    surname: 'ABDUL MUNIR',
    role: 'Lecturer',
    photo: 'Fariz.jpg',
    floor: 'second-floor',
    roomId: 'fariz'
  },
  {
    displayName: 'En AMIRUL AMIN',
    surname: 'ISMAIL',
    role: 'Lecturer',
    photo: 'Amin.jpg',
    floor: 'second-floor',
    roomId: 'amin'
  },
  {
    displayName: 'En AMRAN',
    surname: 'ABDULLAH',
    role: 'Lecturer',
    photo: 'Amran.jpg',
    floor: 'second-floor',
    roomId: 'amran'
  },
  {
    displayName: 'En ADEEB',
    surname: 'OTMAN',
    role: 'Lecturer',
    photo: 'Adeeb.jpg',
    floor: 'second-floor',
    roomId: 'adeeb'
  },
  {
    displayName: 'Dr IRYANI',
    surname: 'ABDUL HALIM CHOO',
    role: 'Lecturer',
    photo: 'Iryani.jpg',
    floor: 'second-floor',
    roomId: 'iryani'
  },
  // --------- Fourth Floor Lecturers (NEW) -----------
  {
    displayName: 'Dr FARID AL HAKEEM',
    surname: 'YUSERRIE',
    role: 'Senior Lecturer',
    photo: 'Farid.jpg',
    floor: 'fourth-floor',
    roomId: 'farid'
  },
  {
    displayName: 'En AHMAD FAIZ',
    surname: 'MOHD NAZAMUDIN',
    role: 'Lecturer',
    photo: 'Mamoo.jpg',
    floor: 'fourth-floor',
    roomId: 'mamoo'
  },
  {
    displayName: 'En MOHAMMAD SYATHIR AMINI',
    surname: 'SHAHBUDIN',
    role: 'Lecturer',
    photo: 'Syathir.jpg',
    floor: 'fourth-floor',
    roomId: 'syathir'
  },
  {
    displayName: 'En SALAHUDDIN ABDUL HAKEEM',
    surname: 'ABAS',
    role: 'Lecturer',
    photo: 'Saha.jpg',
    floor: 'fourth-floor',
    roomId: 'saha'
  },
  {
    displayName: 'Ar. Dr JAMALUDIN',
    surname: 'MUHAMAD',
    role: 'Senior Lecturer',
    photo: 'Jamal.jpg',
    floor: 'fourth-floor',
    roomId: 'jamal'
  },
  {
    displayName: 'Dr SAYED MUHAMMAD AIMAN',
    surname: 'SAYED ABUL KHAIR',
    role: 'Senior Lecturer',
    photo: 'Aiman.jpg',
    floor: 'fourth-floor',
    roomId: 'aiman'
  },
  {
    displayName: 'Ts. IZZAT',
    surname: 'ANUAR',
    role: 'Lecturer',
    photo: 'Izzat.jpg',
    floor: 'fourth-floor',
    roomId: 'izzat'
  },
  // "unoccupied" is not an actual lecturer and not added
  {
    displayName: 'En ABDUL RAHMAN',
    surname: 'KHAMARUZAMAN',
    role: 'Lecturer',
    photo: 'AR.jpg',
    floor: 'fourth-floor',
    roomId: 'ar'
  },
  {
    displayName: 'Ar. MUHAMMAD ASSYAHMIZI',
    surname: 'MOHD YUNUS',
    role: 'Senior Lecturer',
    photo: 'Mizi.png',
    floor: 'fourth-floor',
    roomId: 'mizi'
  },
  {
    displayName: 'En MOHAMAD SHAHIN',
    surname: 'SHAHDAN',
    role: 'Lecturer',
    photo: 'Shahin.jpg',
    floor: 'fourth-floor',
    roomId: 'shahin'
  },
  {
    displayName: 'En MUHAMMAD FARIS',
    surname: 'ARMAN',
    role: 'Lecturer',
    photo: 'Baa.jpeg',
    floor: 'fourth-floor',
    roomId: 'baa'
  },
].sort((a, b) => a.displayName.localeCompare(b.displayName));

const Lecturers: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (floor: string, roomId: string) => {
    navigate(`/${floor}?room=${roomId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-2">Lecturers Room Directory</h1>
          <p className="text-lg text-muted-foreground">
            Click on a lecturer to go directly to their office on the 3D floor plan.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LECTURERS.map((lect, idx) => (
            <div
              key={lect.displayName}
              className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
            >
              <img
                src={`/${lect.photo}`}
                alt={lect.displayName}
                className="w-16 h-16 rounded-full object-cover border border-muted"
                loading={idx < 6 ? "eager" : "lazy"}
              />
              <div className="flex-1">
                <div className="font-medium">{lect.displayName}</div>
                <div className="text-sm text-gray-600">{lect.surname}</div>
                <div className="text-xs text-gray-400 mb-2">{lect.role}</div>
                <Button
                  size="sm"
                  className="mt-1"
                  variant="secondary"
                  onClick={() => handleClick(lect.floor, lect.roomId)}
                >
                  Go to Room
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
