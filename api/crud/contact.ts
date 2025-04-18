import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface ContactUsData {
  email: string;
  name: string;
  message: string;
  mode: string;
  phone: string;
  _id: string;
  createdAt: Date;
}



export const useContactUs = () => {
  const getAllContact = () =>
    useApiQuery<ContactUsData[]>(["contact"], {
      url: `/admin/contact-us`,
      method: "GET",
    });

  const createContactUs = useApiMutation<AuthResponse, FormData>({
    url: "/contact-us",
    method: "POST",
  });

  const getContactById = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/contact-us/${id}`,
      method: "GET",
    });
  };

  const deleteContact = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/contact-us/${id}`,
      method: "DELETE",
    });
  };

  return {
    getAllContact,
    deleteContact,
    createContactUs,
    getContactById,
  };
};
