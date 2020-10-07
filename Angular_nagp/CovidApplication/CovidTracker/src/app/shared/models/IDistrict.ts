interface IDistrict {
  district: string;
  notes: string;
  active: number;
  confirmed: number;
  deaths: number;
  deceased: number;
  recovered: number;
  delta: object;
}

export default IDistrict;
