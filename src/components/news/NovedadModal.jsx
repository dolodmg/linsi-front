"use client";
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';

export const NovedadModal = ({ novedad, onClose }) => {
  if (!novedad) return null;

  return (
    <Modal open={Boolean(novedad)} onClose={onClose} className="max-w-2xl mx-auto">
      <ModalHeader>
        <h2 className="text-xl font-bold">{novedad.title}</h2>
      </ModalHeader>
      <ModalBody>
        {novedad.s3Url && (
          <img
            src={novedad.s3Url}
            alt="Imagen de la novedad"
            className="w-full h-64 object-cover mb-4"
          />
        )}
        <p className="text-gray-700">{novedad.description}</p>
        <p className="text-gray-400 mt-2 text-sm">
          Fecha de publicación: {new Date(novedad.publicationDate).toLocaleDateString()}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cerrar</Button>
      </ModalFooter>
    </Modal>
  );
};
