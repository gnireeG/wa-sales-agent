import { SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "#/components/ui/input-group";

export default function SearchInput({
	onSearch,
	delay = 500,
}: {
	onSearch: (val: string) => void;
	delay?: number;
}) {
	const [value, setValue] = useState("");

	useEffect(() => {
		const id = setTimeout(() => onSearch(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);

	return (
		<InputGroup className="max-w-48">
			<InputGroupInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="max-w-48"
				placeholder="Search"
			/>
			<InputGroupAddon align="inline-end">
				{value.length < 1 && <SearchIcon />}
				{value.length > 0 && (
					<InputGroupButton onClick={() => setValue("")}>
						<X />
					</InputGroupButton>
				)}
			</InputGroupAddon>
		</InputGroup>
	);
}
