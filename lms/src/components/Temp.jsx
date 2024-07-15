import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh; /* Full viewport height */
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ccc; /* Optional: for visual separation */
  height: 100%; /* Ensure it takes full height of the container */
`;

const Temp = () => {
  return (
    <Container>
      <ContentArea>
        <p>Content Area 1</p>
        {/* Add more content here to make it scrollable */}
        <p>Lots of content...</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
          repellat, enim perferendis veritatis fugit est velit nostrum officia
          ratione, natus rem unde error e obcaecati alias ipsum, omnis corrupti
          eveniet vel quarchitecto odio id. Quisquam dignissimos deserunt enim,
          assumenda iure nu
        </p>
      </ContentArea>
      <ContentArea>
        <p>Content Area 2</p>
        {/* Add more content here to make it scrollable */}
        <p>Lots of content...</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sunt,
        maxime quod d. Id eos exercitationem fugiat expedita libero esse
        repellat commodi opti ipsam delecttenetur similique iusto possimus id
        placeat magnam error? Dicta suscipit ex voluptas harum deleniti aperiam
        maxime maiores rem! Ipsum dolor ipsa ab amet cumque corrupti beatae.
        Rerum dolore officia pariatur!
      </ContentArea>
    </Container>
  );
};

export default Temp;
