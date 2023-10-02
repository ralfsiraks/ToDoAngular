import { Pexels } from '../ToDo/interfaces/pexels';

export const pexelsApiResponse: Pexels = {
  page: 1,
  per_page: 1,
  photos: [
    {
      id: 3799761,
      width: 8688,
      height: 5792,
      url: 'https://www.pexels.com/photo/happy-man-funny-sticking-tongue-out-3799761/',
      photographer: 'Andrea Piacquadio',
      photographer_url: 'https://www.pexels.com/@olly',
      photographer_id: 224453,
      avg_color: '#AF655B',
      src: {
        original:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg',
        large2x:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        large:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&h=350',
        small:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&h=130',
        portrait:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
        landscape:
          'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        tiny: 'https://images.pexels.com/photos/3799761/pexels-photo-3799761.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
      },
      liked: false,
      alt: 'Person Holding White Kitten With Flowers Necklace',
    },
  ],
  next_page: '',
  total_results: 0,
};
