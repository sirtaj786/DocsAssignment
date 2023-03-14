import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Tab,
	Table,
	TableContainer,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"


const  LandPage = () => {
	const user = JSON.parse(localStorage.getItem("userDetails")) || "";
	console.log("user",user)
	const [select, setSelect] = useState("");
	const [file, setFile] = useState([]);
	const toast = useToast();
	const arr=[]
	const getUpload= () => {
		fetch(`http://localhost:8080/files/uploadDetails/${user.email}`)

			.then((res) => res.json())
			.then((res) => setFile(res))
			console.log("success")
			// .catch((err)=>{
			// 	console.log(err)
			// }
			// )
	};

	const handleUpload = (e) => {
		const formData = new FormData();
		formData.append("file", select);
		// arr.push(...select)
		// console.log("arr",arr)
		e.preventDefault();
		axios.post(`http://localhost:8080/files/uploadDetails`, {
			email:user.email,
			file:select.name,
			size:select.size,
		})
		// console.log(body)
			.then((res) => {
				if (res.status !== 200) {
					alert("something went wrong")
					
				} else {
					fetch(`http://localhost:8080/files/upload`, {
						method: "POST",
						"Content-Type": "multipart/form-data",
						body: formData,
					})
						.then((res) => {
							alert("file uploaded successfully")
						})
						.catch((err) => {
							console.log(err);
						});
						getUpload();
				}
			})

			.catch((err) => {
				alert(err)
			});
	};
	

	const handleDelete = (id) => {
		fetch(`http://localhost:8080/files/deleteUpload/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				alert("file deleted")
				getUpload();
			});
	};
	


	useEffect(() => {
		getUpload();
	}, []);
	
	console.log("select",select)
	return (
		<>
			<Navbar name={user.email} />

			<Tabs variant={"line"} p="10" pt="5">
				<TabList>
					<Tab _selected={{ fontSize: 17, color: "blue.400" }}>Upload</Tab>
					<Tab _selected={{ fontSize: 17, color: "blue.400" }}>Files</Tab>
				</TabList>
				<TabPanels>
				
					<TabPanel>
						<form encType="multipart/form-data" onSubmit={handleUpload}>
							<Flex placeItems={"center"} w="70%" m="10vh auto">
								<FormControl isRequired>
									<FormLabel>Choose file for upload</FormLabel>
									<Input
										type={"file"}
										border="none"
										accept="application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv"
										onChange={(e) => {
											setSelect(e.target.files[0]);
										}}
									/>
								</FormControl>
								<Button variant={"solid"} colorScheme="gray" type="submit">
									Upload
								</Button>
							</Flex>
						</form>
					</TabPanel>
					
					<TabPanel>
						{select? (
							<TableContainer>
							<Table variant='simple'>
							 
							  <Thead>
								<Tr>
								  
								  <Th>File Name</Th>
								  <Th >Size</Th>
								  <Th>Remove</Th>
								  
								</Tr>
							  </Thead>
							  <Tbody>
								<Tr>
								  
								  <Td>{select.name}</Td>
								  <Td >{select.size}</Td>
								  <Td>
								  <Button  color="red"onClick={() => {
																handleDelete(select._id);
															}}>Delete</Button>
															</Td>
								</Tr>
							   
							   
							  </Tbody>
							  
							</Table>
						  </TableContainer>
						) : (
							<Heading>No file</Heading>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
};

export default LandPage;