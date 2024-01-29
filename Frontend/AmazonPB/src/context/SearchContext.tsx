import { create } from "@mui/material/styles/createTransitions";
import { ReactNode, createContext, useContext, useState } from "react";



type SearchItem = {
    id: number;
    name: string;
    value: number;
    img: string;
    description: string;
    tags: string[];
}

type SearchContextType = {
    Search: string;
    Add: (item: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type SearchProviderProps = {
    children: ReactNode;
  };

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) =>{
    const [Search, setSearch] = useState<any>('');

    const Add = (item: string) =>{
        setSearch(item);
    };


    const contextValue: SearchContextType = {
        Search,
        Add,
      };

    return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    console.log(context);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };