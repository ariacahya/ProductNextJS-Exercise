import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/aegis.png" alt="dota2" className="logo-image" /> {/* Ganti "/path/to/logo.png" dengan jalur gambar logo yang sesuai */}
      </div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link href="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/productlist" className="navbar-link">
            Product List
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/productcard" className="navbar-link">
            Product Card
          </Link>
        </li>
        <li className="navbar-item">
          <Link href="/about" className="navbar-link">
            About
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: flex-start; /* Menggeser isi navbar ke kiri */
          align-items: center; /* Pusatkan vertikal */
          padding: 10px; /* Tambahkan padding untuk ruang di sekitar logo */
        }

        .navbar-logo {
          margin-right: 10px; /* Berikan margin kanan untuk pemisahan antara logo dengan menu */
        }

        .logo-image {
          width: 50px; /* Sesuaikan lebar logo */
          height: 50px; /* Sesuaikan tinggi logo */
        }

        .navbar-list {
          list-style: none;
          display: flex;
          justify-content: center;
        }

        .navbar-item {
          margin: 0 10px;

        }

        .navbar-link {
          text-decoration: none;
          color: black;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
