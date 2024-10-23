"use client"
import React, { useEffect, useState } from "react"
import { Select, SelectItem, Autocomplete, AutocompleteItem, AutocompleteSection } from '@nextui-org/react';
import { useFormContext, Controller } from 'react-hook-form';
import { getMembersAction } from "@/actions/member";
import { useFormStoreProject } from "@/app/store";

const SelectMembers = ({ name, labelMembers, placeholder, defaultValue }) => {
    const { formState: { errors }, control } = useFormContext();
    const { setMemberId } = useFormStoreProject();
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const membersData = await getMembersAction();
            setMembers(membersData || []);
          } catch (error) {
            console.error("Error fetching members:", error);
            setError('Error al cargar los miembros');
          }
        };
        fetchMembers();
      }, []);
}