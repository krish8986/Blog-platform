// 
import { Button, Table, TableBody, TableHead, TableRow, TableCell, styled } from '@mui/material';
// 
import { Link, useSearchParams } from 'react-router-dom';
// 
import { categories } from '../../constants/data';
// 
const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    `

const StyledButton = styled(Button)`
margin: 20px;
width: 85%;
background: #6495ED;
color: #fff;
`;
// 
const styledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    `;
// 
const Categories = () => {
 
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
 
    return (
        <>
        <styledLink to={`/create?category=${category || ''}`}>
        <StyledButton variant="contained">CREATE BLOG</StyledButton>
        </styledLink>
        
         
          <StyledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <styledLink to='/'> All Categories
                        </styledLink>
                       
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    categories.map(category => (
                        <TableRow key={category.id}>
                              <TableCell>
                                <styledLink to={`/?category=${category.type}`}>
                                {category.type}
                                </styledLink> 
                              </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
          </StyledTable>
        </>
    )
}
// 
export default Categories;
