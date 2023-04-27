import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://scontent.fmga4-1.fna.fbcdn.net/v/t1.6435-9/82940543_128222445339966_8803205900367036416_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=7kKFwzxCXRAAX9PFgDu&_nc_ht=scontent.fmga4-1.fna&oh=00_AfBdjzLwPcyqdXHluTkdNyRozoBwCKmNRRoXMNHxkrvYkQ&oe=64715E54';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Educamos para la redención
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Estamos A Un Paso De Lograrlo
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Registrate
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Tu puedes ya casi
      </Typography>
    </ProductHeroLayout>
  );
}