import City from '../entities/City';

export default interface ICitiesRepository {
  create(params: City): Promise<City>;
  find(params: City): Promise<City[]>;
}