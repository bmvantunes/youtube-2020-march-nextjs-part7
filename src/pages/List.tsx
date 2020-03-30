import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { VehiclePerson } from '../../api/VehiclePerson';
import MyComp from './bruno';

export interface ListProps {
  ownersList?: VehiclePerson[];
}

export default function List({ownersList}: ListProps) {
  return (
    <div>
      {ownersList?.map((e, index) => (
        <div key={index}>
          <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {e.ownerName}'s {e.vehicle}
            </a>
            <MyComp/>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/vehicles');
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return {ownersList: ownersList}
}